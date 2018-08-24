# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2018-08-24 08:03
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20180817_1204'),
    ]

    operations = [
        migrations.CreateModel(
            name='Essay',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('info', models.TextField(blank=True, max_length=500, verbose_name='心情留言')),
                ('created_time', models.DateTimeField(auto_now_add=True, verbose_name='创建时间')),
                ('last_modified_time', models.DateTimeField(auto_now=True, verbose_name='修改时间')),
            ],
            options={
                'verbose_name': '心情随笔',
                'verbose_name_plural': '心情管理',
                'ordering': ('-created_time',),
            },
        ),
    ]