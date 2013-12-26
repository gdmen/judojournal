from rest_framework import serializers
from apps.api.models import *

class LocationSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Location

class RatingSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Rating

class GoalSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Goal

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Question

class StatusSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Status

class EventSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Event
