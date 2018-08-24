from django.conf.urls import url
from myblog.upload import upload_image
from . import views

urlpatterns = [
    url(r'^$', views.index ,name='homepage'),
    url(r'^article/(?P<article_id>[0-9]+)/$', views.article, name='article'),
    url(r'^article_list/(?P<category_id>[0-9]+)/$', views.articleList, name='articleList'),
    url(r'^taglist/(?P<tag_id>[0-9]+)/$', views.tags, name='tagArtList'),
    url(r'^admin/uploads/(?P<dir_name>[^/]+)$', upload_image, name='upload_image'),
    url(r'^getphotos', views.getphotos, name='Getphoto'),
]