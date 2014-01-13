from tastypie.resources import ModelResource
from apps.api.models import *

class EntryTypeResource(ModelResource):
  class Meta:
    queryset = EntryType.objects.all()
    resource_name = 'entry_type'

class LocationResource(ModelResource):
  class Meta:
    queryset = Location.objects.all()
    resource_name = 'location'

class GoalResource(ModelResource):
  class Meta:
    queryset = Goal.objects.all()
    resource_name = 'goal'

class GoalInstanceResource(ModelResource):
  class Meta:
    queryset = GoalInstance.objects.all()
    resource_name = 'goal_instance'

class QuestionResource(ModelResource):
  class Meta:
    queryset = Question.objects.all()
    resource_name = 'question'

class TechniqueResource(ModelResource):
  class Meta:
    queryset = Technique.objects.all()
    resource_name = 'technique'

class TechniqueVariationResource(ModelResource):
  class Meta:
    queryset = TechniqueVariation.objects.all()
    resource_name = 'technique_variation'

class EntryACategoryAResource(ModelResource):
  class Meta:
    queryset = EntryACategoryA.objects.all()
    resource_name = 'entry_a_category_a'

class EntryACategoryBResource(ModelResource):
  class Meta:
    queryset = EntryBCategoryB.objects.all()
    resource_name = 'entry_a_category_b'

class EntryAResource(ModelResource):
  class Meta:
    queryset = EntryA.objects.all()
    resource_name = 'entry_a'