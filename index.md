---
layout: home
title: Web programming blog
---

<p>Welcome to my blog. Have a lil' look around.</p>
<h2><strong>Posts</strong></h2>
<ul class="posts">
 {% for post in site.posts %}
 <li><span>{{ post.date | date_to_string }}</span> » <a href="{{ post.url }}" title="{{ post.title }}">{{
post.title }}</a></li>
 {% endfor %}
</ul>