from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self,request,format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            #len(room) > 0 improper replaced with 
            if room.exists():
                data = RoomSerializer(room[0]).data 
                data['is_host'] = self.request.session.session_key == room[0].host #check to see if user is the host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found':'Invalid Room Code.'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
#how does user join a room -> send room code to make sure its valid
class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    
    def post(self,request,format=None):
        if not self.request.session.exists(self.request.session.session_key): #if current user has an active session, if not create that session
            self.request.session.create()
        #get code from post req
        code = request.data.get(self.lookup_url_kwarg)
        if(code != None):
            queryset = Room.objects.filter(code=code)
            if queryset.exists():
                room = queryset[0]
                #TODO - check if user is currently in a room to join them later or not
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined'},status=status.HTTP_200_OK)
            return Response({'Room Not Found':'Invalid Room Code.'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)

class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer
    
    def post(self,request, format=None):
        if not self.request.session.exists(self.request.session.session_key): #if current user has an active session, if not create that session
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): #if serializer is valid can get the data
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            #check if need to create a new room or update the room
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host,guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip)
                room.save()
                self.request.session['room_code'] = room.code
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED) #return the serialization of room data (json)
            
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)