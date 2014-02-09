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
class Goal(HasUserModel):
  brief = models.CharField(max_length=140, unique=True)
  details = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class GoalInstance(HasUserModel, HasRatingModel):
  goal = models.ForeignKey(Goal)
  details = models.TextField(blank=True)
  created = models.DateTimeField(auto_now_add=True)

class Art(HasUserModel):
  # e.g. 'Judo'
  name = models.CharField(max_length=140, unique=True)

class Type(HasUserModel):
  # e.g. 'Open Mat'
  name = models.CharField(max_length=140, unique=True)

class Location(HasUserModel):
  name = models.CharField(max_length=140, unique=True)
  url = models.URLField(blank=True)

"""
  Abstract Entry
"""
class AbstractEntry(HasUserModel, HasRatingModel):
  start = models.DateTimeField()
  end = models.DateTimeField()
  art = models.ForeignKey(Art)
  type = models.ForeignKey(Type)
  location = models.ForeignKey(Location)
  goals = models.ManyToManyField(GoalInstance, blank=True, null=True)
  class Meta:
    abstract = True
    
class AbstractModule(HasUserModel):
  details = models.TextField(blank=True)
  class Meta:
    abstract = True

# Notes
class NoteModule(AbstractModule):
  title = models.TextField()

"""
  Judo, BJJ entry
"""
# Drills
class DrillModule(AbstractModule):
  name = models.TextField()

# Sparring
class SparringModule(AbstractModule):
  partner = models.CharField(max_length=140, blank=True)
  # duration
  minutes = models.DecimalField(max_digits=5, decimal_places=2, null=True)

class JudoEntry(AbstractEntry):
  drills = models.ManyToManyField(DrillModule, blank=True, null=True)
  sparring = models.ManyToManyField(SparringModule, blank=True, null=True)
  notes = models.ManyToManyField(NoteModule, blank=True, null=True)

"""
  Stand-Alone Models
"""
class Question(HasUserModel):
  brief = models.CharField(max_length=140, unique=True)
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
