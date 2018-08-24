from django.shortcuts import render, HttpResponse
from django.db.models import Q
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from blog.models import *
from datetime import datetime
import json, time
# Create your views here.

def my_render(request, html, content):
    category = Category.objects.all()
    tags = Tag.objects.all()
    art_num = Articles.objects.all().count()
    cat_num = Category.objects.all().count()
    tag_num = Tag.objects.all().count()
    day_num = (datetime.now() - datetime(2017, 11, 25)).days
    last_date = datetime(2018,5,21)
    blog = {
        'art_num': art_num,
        'cat_num': cat_num,
        'tag_num': tag_num,
        'day_num': day_num,
        'last_date': last_date
    }
    content['category'] = category
    content['tags'] = tags
    content['blog'] = blog
    return render(request, html, content)
    pass


def index(request):
    newart = Articles.objects.all()[:2]
    hotart = Articles.objects.order_by("-views")[:4]
    return my_render(request, 'blog/index.html', {"newa": newart, "hota": hotart})


def articleList(request, category_id):
    if category_id == '1':
        photo = Photos.objects.order_by("-created_time")[:12]
        return my_render(request, 'blog/photo_album.html', {"photos": photo})
    if category_id == '4':
        artcon = Articles.objects.order_by("-created_time").filter(Q(category_id=2) | Q(category_id=3))
        year = []
        for article in artcon:
            year.append(article.created_time.strftime("%Y"))
        year = list(set(year))
        year = sorted(year, reverse=True)
        return my_render(request, 'blog/time_line.html', {"art": artcon, "year": year})
    if category_id == '5':
        essay = Essay.objects.all()
        return my_render(request, 'blog/essay.html', {"essay": essay})
    artcon = Articles.objects.filter(category_id=category_id)
    pcategory = Category.objects.get(id=category_id)
    paginator = Paginator(artcon, 6)
    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)
    return my_render(request, 'blog/article_list.html', {"article": contacts, "pcategory": pcategory})


def article(request, article_id):
    artcon = Articles.objects.get(id=article_id)
    artcon.views += 1
    artcon.save()
    return my_render(request, 'blog/article.html', {"article": artcon})


def tags(request, tag_id):
    tag = Tag.objects.get(id=tag_id)
    article = tag.articles_set.all()
    paginator = Paginator(article, 6)
    page = request.GET.get('page')
    try:
        contacts = paginator.page(page)
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        contacts = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        contacts = paginator.page(paginator.num_pages)
    return my_render(request, 'blog/taglist.html', {"article": contacts, "tag": tag})
    pass


def getphotos(request):
    if request.method == 'GET':
        page = int(request.GET.get('page'))
        all_num = Photos.objects.all().count()
        page_pre = all_num if all_num <= 12 * page else 12 * page
        page_next = all_num if all_num <= 12 * (page + 1) else 12 * (page + 1)
        photo = Photos.objects.order_by("-created_time")[page_pre : page_next]
        photoinfo = []
        for info in photo:
            temp = {"src": str(info.photo),"info":info.info}
            photoinfo.append(temp)
        photodata = {"photodata": photoinfo}
        return HttpResponse(json.dumps(photodata))
