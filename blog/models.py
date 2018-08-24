from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Category(models.Model):
    name = models.CharField('类名', max_length=20)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_modified_time = models.DateTimeField('修改时间', auto_now=True)

    class Meta:
        verbose_name = '类目'
        verbose_name_plural = '类目管理'

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField('标签名', max_length=20)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    last_modified_time = models.DateTimeField('修改时间', auto_now=True)

    class Meta:
        verbose_name = '标签'
        verbose_name_plural = '标签管理'

    def __str__(self):
        return self.name


class Articles(models.Model):
    title = models.CharField('标题', max_length=300)
    author = models.ForeignKey(User, verbose_name='作者', related_name="article_posts")
    abstract = models.TextField('摘要', max_length=1000, blank=True)
    body = models.TextField('文章', null=True)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    # auto_now_add : 创建时间戳，不会被覆盖
    last_modified_time = models.DateTimeField('修改时间', auto_now=True)
    # auto_now: 自动将当前时间覆盖之前时间
    views = models.PositiveIntegerField('浏览量', default=0)
    comments = models.PositiveIntegerField('评论量', default=0)
    # 目录分类
    # on_delete 当指向的表被删除时，将该项设为空
    category = models.ForeignKey('Category', verbose_name='分类',
                                 null=True,
                                 on_delete=models.SET_NULL)
    tags = models.ManyToManyField('Tag', verbose_name='标签', null=True,)

    class Meta:
        verbose_name = '文章'
        verbose_name_plural = '文章管理'
        ordering = ("-created_time",)

    def __str__(self):
        return self.title


class Photos(models.Model):
    photo = models.ImageField('照片', upload_to='photo/%Y/%m/%d/', unique=True)
    info = models.TextField('信息', max_length=1000, blank=True)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    # auto_now_add : 创建时间戳，不会被覆盖
    last_modified_time = models.DateTimeField('修改时间', auto_now=True)

    class Meta:
        verbose_name = '照片墙'
        verbose_name_plural = '照片管理'
        ordering = ("-created_time",)

    def __str__(self):
        return str(self.id)

class Essay(models.Model):
    info = models.TextField('心情留言', max_length=500, blank=True)
    created_time = models.DateTimeField('创建时间', auto_now_add=True)
    # auto_now_add : 创建时间戳，不会被覆盖
    last_modified_time = models.DateTimeField('修改时间', auto_now=True)

    class Meta:
        verbose_name = '心情随笔'
        verbose_name_plural = '心情管理'
        ordering = ("-created_time",)

    def __str__(self):
        return self.info