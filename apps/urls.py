from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

from tastypie.api import Api
from api.resources import *

v1_api = Api(api_name='v1')
v1_api.register(EntryTypeResource())
v1_api.register(LocationResource())
v1_api.register(GoalResource())
v1_api.register(GoalInstanceResource())
v1_api.register(QuestionResource())
v1_api.register(TechniqueResource())
v1_api.register(TechniqueVariationResource())
v1_api.register(DrillEntryModule())
v1_api.register(RandoriEntryModule())
v1_api.register(EntryAResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'apps.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    
    url(r'^accounts/', include('registration.backends.default.urls')),
    
    url(r'^account/', include('django.contrib.auth.urls')),
    
    url(r'^admin/', include(admin.site.urls)),
    
    url(r'^api/', include(v1_api.urls)),
)
