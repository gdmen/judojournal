from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView
from django.contrib.auth.decorators import login_required

from django.contrib import admin
admin.autodiscover()

from tastypie.api import Api
from api.resources import *

v1_api = Api(api_name='v1')
v1_api.register(GoalResource())
v1_api.register(GoalInstanceResource())
v1_api.register(ArtResource())
v1_api.register(TypeResource())
v1_api.register(LocationResource())
v1_api.register(DrillModuleResource())
v1_api.register(SparringModuleResource())
v1_api.register(NoteModuleResource())
v1_api.register(JudoEntryResource())
v1_api.register(QuestionResource())
v1_api.register(TechniqueResource())
v1_api.register(TechniqueVariationResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'apps.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    
    #url(r'^$', TemplateView.as_view(template_name='landing.html'), name='landing'),
    
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    
    url(r'^edit/', login_required(TemplateView.as_view(template_name='edit.html')), name='edit'),
    
    #url(r'', include('registration.backends.default.urls')),
    
    url(r'', include('django.contrib.auth.urls')),
    
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/', include(v1_api.urls)),
)
