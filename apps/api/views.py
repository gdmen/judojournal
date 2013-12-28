from rest_framework import viewsets
from apps.api.serializers import *

class PermissionViewSet(viewsets.ModelViewSet):
  queryset = Permission.objects.all()
  serializer_class = PermissionSerializer

class GroupViewSet(viewsets.ModelViewSet):
  queryset = Group.objects.all()
  serializer_class = GroupSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class HasUserViewSet(viewsets.ModelViewSet):
  model = None
  def pre_save(self, obj):
    obj.user = self.request.user
  def get_queryset(self):
    if self.request.user.is_superuser:
      return self.model.objects.all()
    return self.model.objects.filter(user=self.request.user)
  class Meta:
    abstract = True

class LocationViewSet(HasUserViewSet):
  model = Location
  serializer_class = LocationSerializer

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
