from rest_framework import serializers
from apps.api.models import *
from django.contrib.auth.models import User, Permission, Group

class PermissionSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Permission

class GroupSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Group

class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    #fields = ('id',)

class LocationSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Location
    read_only_fields = ('user',)

class GoalSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Goal
    read_only_fields = ('user',)

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Question
    read_only_fields = ('user',)

class StatusSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Status
    read_only_fields = ('user',)

class EventSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Event
    read_only_fields = ('user',)
