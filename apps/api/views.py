from rest_framework import viewsets
from apps.api.serializers import *

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

class PermissionViewSet(viewsets.ModelViewSet):
  model = Permission
  def get_queryset(self):
    if self.request.user.is_superuser:
      return self.model.objects.all()
    return []
  serializer_class = PermissionSerializer

class GroupViewSet(viewsets.ModelViewSet):
  model = Group
  def get_queryset(self):
    if self.request.user.is_superuser:
      return self.model.objects.all()
    return []
  serializer_class = GroupSerializer

class UserViewSet(viewsets.ModelViewSet):
  model = User
  def get_queryset(self):
    if self.request.user.is_superuser:
      return self.model.objects.all()
    return self.model.objects.filter(id=self.request.user.id)
  serializer_class = UserSerializer

class LocationViewSet(HasUserViewSet):
  model = Location
  serializer_class = LocationSerializer

class GoalViewSet(HasUserViewSet):
  model = Goal
  serializer_class = GoalSerializer

class QuestionViewSet(HasUserViewSet):
  model = Question
  serializer_class = QuestionSerializer

class StatusViewSet(HasUserViewSet):
  model = Status
  serializer_class = StatusSerializer

class EventViewSet(HasUserViewSet):
  model = Event
  serializer_class = EventSerializer
