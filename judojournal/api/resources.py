from tastypie.authentication import SessionAuthentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie import fields
from judojournal.api.models import *

class HasUserResource(ModelResource):
  class Meta:
    abstract = True
    always_return_data = True
    excludes = ['is_superuser']
    authentication = SessionAuthentication()
    authorization = Authorization()

  def apply_authorization_limits(self, request, object_list):
    return object_list.filter(user=request.user)

class GoalResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = Goal.objects.all()
    resource_name = 'goal'
  def obj_create(self, bundle, **kwargs):
    return super(GoalResource, self).obj_create(bundle, user=bundle.request.user)

class GoalInstanceResource(HasUserResource):
  goal = fields.ForeignKey(GoalResource, 'goal', full=True)
  class Meta(HasUserResource.Meta):
    queryset = GoalInstance.objects.all()
    resource_name = 'goal/instance'
  def obj_create(self, bundle, **kwargs):
    return super(GoalInstanceResource, self).obj_create(bundle, user=bundle.request.user)

class ArtResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = Art.objects.all()
    resource_name = 'art'
  def obj_create(self, bundle, **kwargs):
    return super(ArtResource, self).obj_create(bundle, user=bundle.request.user)
    
class TypeResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = Type.objects.all()
    resource_name = 'type'
  def obj_create(self, bundle, **kwargs):
    return super(TypeResource, self).obj_create(bundle, user=bundle.request.user)
    
class LocationResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = Location.objects.all()
    resource_name = 'location'
  def obj_create(self, bundle, **kwargs):
    return super(LocationResource, self).obj_create(bundle, user=bundle.request.user)

class DrillEntryModuleResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = DrillEntryModule.objects.all()
    resource_name = 'entry/module/drill'
  def obj_create(self, bundle, **kwargs):
    return super(DrillEntryModuleResource, self).obj_create(bundle, user=bundle.request.user)

class SparringEntryModuleResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = SparringEntryModule.objects.all()
    resource_name = 'entry/module/sparring'
  def obj_create(self, bundle, **kwargs):
    return super(SparringEntryModuleResource, self).obj_create(bundle, user=bundle.request.user)

class JudoEntryResource(HasUserResource):
  art = fields.ToOneField(ArtResource, 'art', full=True)
  type = fields.ToOneField(TypeResource, 'type', full=True)
  location = fields.ToOneField(LocationResource, 'location', full=True)
  goals = fields.ToManyField(GoalInstanceResource, 'goals', blank=True, null=True, full=True)
  drills = fields.ToManyField(DrillEntryModuleResource, 'drills', blank=True, null=True, full=True)
  sparring = fields.ToManyField(SparringEntryModuleResource, 'sparring', blank=True, null=True, full=True)
  class Meta(HasUserResource.Meta):
    queryset = JudoEntry.objects.all()
    resource_name = 'entry/judo'
  def obj_create(self, bundle, **kwargs):
    return super(JudoEntryResource, self).obj_create(bundle, user=bundle.request.user)

class QuestionResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = Question.objects.all()
    resource_name = 'question'
  def obj_create(self, bundle, **kwargs):
    return super(QuestionResource, self).obj_create(bundle, user=bundle.request.user)

class TechniqueResource(HasUserResource):
  class Meta(HasUserResource.Meta):
    queryset = Technique.objects.all()
    resource_name = 'technique'
  def obj_create(self, bundle, **kwargs):
    return super(TechniqueResource, self).obj_create(bundle, user=bundle.request.user)

class TechniqueVariationResource(HasUserResource):
  technique = fields.ToOneField(TechniqueResource, 'technique', full=True)
  class Meta(HasUserResource.Meta):
    queryset = TechniqueVariation.objects.all()
    resource_name = 'technique/variation'
  def obj_create(self, bundle, **kwargs):
    return super(TechniqueVariationResource, self).obj_create(bundle, user=bundle.request.user)