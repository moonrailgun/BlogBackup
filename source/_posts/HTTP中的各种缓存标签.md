---
title: HTTP中的各种缓存标签
tags:
  - HTML
  - HTML5
abbrlink: da49e84e
date: 2020-12-30 09:50:28
---

- `ETag`(如: `50b1c1d4f775c61:df3`):
    发送请求时服务端会通过`ETag`返回资源计算出的实体值，在再次发送请求时浏览器会带上一个`If-None-Match`(如`W / "50b1c1d4f775c61:df3"`)请求头，服务端会对这个请求与这个资源的实体值进行对比，如果相同则直接返回304
- `Last-Modified`(如: `Fri , 12 May 2006 18:53:33 GMT`):
    发送请求时服务端会通过`ETag`返回资源最后更新时间，在再次发送请求时浏览器会带上一个`If-Modified-Since`请求头，服务端会对这个请求与这个资源的最后更新时间进行对比，如果`服务端资源的最后更新时间`>=`If-Modified-Since`则返回304
- `Expires`/`Cache-Control`:
    浏览器缓存，如果`当前时间`<`过期时间`则不会发送请求。该过程不需要服务端介入，是浏览器本身的缓存行为。可以通过首次请求资源后服务端返回的响应头来被服务端进行控制。
  - `Expires`来源于`http/1.0`
  - `Cache-Control`来源于`http/1.1` `max-age`单位为秒
  - 如果`Cache-Control`与`Expires`同时存在，`Cache-Control`生效

### 用户操作与缓存

| 用户操作 | Expires/Cache-Control | Last-Modified/Etag |
| ---- | ---- | ---- |
| 地址栏回车 | 有效 | 有效 |
| 页面链接跳转 | 有效 | 有效 |
| 新开窗口 | 有效 | 有效 |
| 前进后退 | 有效 | 有效 |
| F5刷新 | 无效 | 有效 |
| Ctrl+F5强制刷新 | 无效 | 无效 |
