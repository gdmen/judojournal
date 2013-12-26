from rest_framework import viewsets
from apps.api.serializers import *

class LocationViewSet(viewsets.ModelViewSet):
  queryset = Location.objects.all()
  serializer_class = LocationSerializer

class RatingViewSet(viewsets.ModelViewSet):
  queryset = Rating.objects.all()
  serializer_class = RatingSerializer

class GoalViewSet(viewsets.ModelViewSet):
  queryset = Goal.objects.all()
  serializer_class = GoalSerializer

class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer

class StatusViewSet(viewsets.ModelViewSet):
  queryset = Status.objects.all()
  serializer_class = StatusSerializer

class EventViewSet(viewsets.ModelViewSet):
  queryset = Event.objects.all()
  serializer_class = EventSerializer
