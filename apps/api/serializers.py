from rest_framework import serializers
from apps.api.models import *
from django.contrib.auth.models import User, Permission, Group

class PermissionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Permission

class GroupSerializer(serializers.ModelSerializer):
  class Meta:
    model = Group

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User

class LocationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Location
    read_only_fields = ('user',)

class GoalSerializer(serializers.ModelSerializer):
  class Meta:
    model = Goal
    read_only_fields = ('user',)

class QuestionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Question
    read_only_fields = ('user',)

class StatusSerializer(serializers.ModelSerializer):
  class Meta:
    model = Status
    read_only_fields = ('user',)

class ActivitySerializer(serializers.ModelSerializer):
  class Meta:
    model = Activity
    read_only_fields = ('user',)

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    read_only_fields = ('user',)
