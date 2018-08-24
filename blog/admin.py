from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_time', 'last_modified_time',)
    search_fields = ('name',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_time', 'last_modified_time',)
    search_fields = ('name',)


@admin.register(Articles)
class ArticlesAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'abstract', 'category', 'show_tags',
                    'views', 'comments', 'created_time', 'last_modified_time',)
    search_fields = ('title', 'author',)
    list_filter = ('author', 'category',)
    list_per_page = 20
    ordering = ['created_time', 'last_modified_time']
    filter_horizontal = ['tags']

    def show_tags(self, obj):
        return [a.name for a in obj.tags.all()]

    class Media:
        js = (
            'js/kindeditor/kindeditor-all-min.js',
            'js/kindeditor/lang/zh-CN.js',
            'js/kindeditor/config.js',
        )


@admin.register(Photos)
class PhotosAdmin(admin.ModelAdmin):
    list_display = ('photo', 'info', 'created_time', 'last_modified_time',)
    search_fields = ('info',)

@admin.register(Essay)
class EssayAdmin(admin.ModelAdmin):
    list_display = ('info', 'created_time', 'last_modified_time',)
    search_fields = ('info',)

admin.site.site_header = '与诗个人博客后台管理平台'
admin.site.site_title = '与诗'
#admin.site.register(Articles, ArticlesAdmin)