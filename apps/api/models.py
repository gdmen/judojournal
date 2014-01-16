from django.db import models
from django.contrib.auth.models import User

"""
  Abstract Helpers
"""
class HasRatingModel(models.Model):
  rating = models.SmallIntegerField()
  class Meta:
    abstract = True

class HasUserModel(models.Model):
  user = models.ForeignKey(User)
  class Meta:
    abstract = True

"""
  Entry components
"""
class EntryType(HasUserModel):
  # e.g. 'Judo'
  name = models.TextField()
  # e.g. 'Open Mat'
  type = models.TextField(blank=True)

class Goal(HasUserModel):
  brief = models.CharField(max_length=140)
  details = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class GoalInstance(HasUserModel, HasRatingModel):
  goal = models.ForeignKey(Goal)
  details = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class Location(HasUserModel):
  name = models.CharField(max_length=140)
  url = models.CharField(max_length=250, blank=True)

"""
  Abstract Entry
"""
class AbstractEntry(HasUserModel, HasRatingModel):
  start = models.DateTimeField()
  end = models.DateTimeField()
  pre_status = models.TextField(blank=True)
  post_status = models.TextField(blank=True)
  type = models.ForeignKey(EntryType)
  location = models.ForeignKey(Location)
  goals = models.ManyToManyField(GoalInstance, blank=True, null=True)
  class Meta:
    abstract = True
    
class AbstractEntryModule(HasUserModel, HasRatingModel):
  details = models.TextField(blank=True)
  class Meta:
    abstract = True

"""
  Judo, BJJ entry
"""
# Drills
class DrillEntryModule(AbstractEntryModule):
  name = models.TextField()

# Sparring
class SparringEntryModule(AbstractEntryModule):
  partner = models.CharField(max_length=140, blank=True)
  # duration
  minutes = models.DecimalField(max_digits=5, decimal_places=2, null=True)

class EntryA(AbstractEntry):
  drills = models.ForeignKey(DrillEntryModule, blank=True, null=True)
  sparring = models.ForeignKey(SparringEntryModule, blank=True, null=True)

"""
  Stand Alone
"""
class Question(HasUserModel):
  brief = models.CharField(max_length=140)
  details = models.TextField(blank=True)
  answer = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class Technique(HasUserModel):
  # csv names
  names = models.TextField()
  brief = models.CharField(max_length=140)
  principles = models.TextField(blank=True)

class TechniqueVariation(HasUserModel):
  technique = models.ForeignKey(Technique)
  # csv names
  names = models.TextField()
  steps = models.TextField(blank=True)