# Microservice Project Learn

## 一、前端

基于tensquare项目的CoderHub

- 前台使用NUXT开发：[tensquare-frontend](./tensquare-frontend)
- 管理后台使用Vue-cli脚手架开发：[tensquare-management](./tensquare-management)
- CoderHub文档见document：[coderhub-documents](./coderhub-documents)

## 二、后端

采用SpringCloud微服务开发，使用docker以及Jenkins自动化部署。开发记录如下：

>踩坑记录见note!!!

2020.8.20

1. 创建VM，安装mysql57(root:123456)，建库建表

   >maven下载过慢
   >
   >修改.m2中的settings.xml文件，添加镜像(没有的话从conf文件夹中找)
   >
   >参考[maven下载过慢](https://www.cnblogs.com/chenyanbin/p/11706339.html)

2. 搭建父工程

   - maven项目，pom中指定springboot依赖，maven指向spring仓库

3. 搭建common module

   - Result、PageResult、StatusCode公共类
   - 分布式ID生成器(twitter: snowflake雪花算法)
     - snowflake-64bit(时间戳+工作机器id(宿主机id+微服务id)+序列号)
     - 整体上id按照时间自增排序，并且整个分布式系统内不会产生ID碰撞(由数据中心ID和机器ID作区分)
   
4. 搭建基础微服务 base module

   >分布式开发记得实现序列化

   - label的增删改查
   - label的条件查询和分页查询
     - SpringData: Page<T>, `Pageable`
     - SpringDataJpa: `Specification`, `Predicate`

8.21

1. 搭建招聘微服务 recruit module
   
   - `JpaRespository`自定义接口
   
2. 搭建问答微服务 qa module

   - Jpa 使用 `native SQL` 
   - note!!! 原生sql不要自己加末尾的分号，使用pageable会出错(limit syntax error)

3. 搭建文章微服务 article module

   - 缓存 `redis` spring-data-redis: `RedisTemplate`

4. 搭建活动微服务 gathering module

   - 缓存 `springcache` (不能设置过期时间等，适用场景有限)
   
     >Spring Cache使用方法与Spring对事务管理的配置相似。Spring Cache的核心就是对某个方法进行缓存，其实质就是缓存该方法的返回结果，并把方法参数和结果用键值对的方式存放到缓存中，当再次调用该方法使用相应的参数时，就会直接从缓存里面取出指定的结果进行返回
     >
     >@Cacheable-------使用这个注解的方法在执行后会缓存其返回结果。
     >@CacheEvict--------使用这个注解的方法在其执行前或执行后移除Spring Cache中的某些元素。
     
   - 启动类： @EnableCaching
   
     GET方法： @Cacheable(value="全局名称",key="(真正的key) #id")
   
     Update/Delete方法：@CacheEvict(value="",key="")

8.25 

1. 搭建吐槽微服务 spit module
   - MongoDB: spring-data-mongodb  `MongoTemplate`
     - MongoDB 的`文档（document）`，相当于关系数据库中的一行记录。
     - 多个文档组成一个`集合（collection）`，相当于关系数据库的表。
     - 多个集合（collection），逻辑上组织在一起，就是`数据库（database）`。
     - 一个 `MongoDB 实例`支持多个数据库（database）。

8.27 

1. 分布式搜索引擎ElasticSearch

   - 概念

     - 索引库：index(PUT)

     - 类型：type

     - 文档：document

   - 图形化界面插件[Head](https://github.com/mobz/elasticsearch-head)

   - IK分词器(默认中文分词不友好)
   - logstash：日志搜集处理框架。这里用于ES和MySQL数据同步
   - spring-data-elasticsearch
     - 是否索引：看该域是否能被搜索
     - 是否分词：是否分词：搜索的时候是整体匹配还是单词匹配
     - 是否存储：是否要在界面上显示
   - docker部署
     - 开启es远程访问: 修改配置文件`elasticsearch/config/elasticsearch.yml`
     - 系统调优: 修改配置文件`/etc/security/limits.conf`

2. 搭建搜索微服务

8.28

1. 消息中间件RabiitMQ `RabbitTemplate`
   - Direct模式：message通过default Exchange转发到RouteKey指定的Queue。无需对Exchange进行binding。
   - Fanout分列模式： 任何发送到Fanout Exchange的消息都会被转发到与该Exchange绑定(Binding)的所有Queue上。这种模式需要提前将Exchange与Queue进行绑定。一个Exchange可以绑定多个Queue，一个Queue可以同多个Exchange进行绑定。
   - Topic主题模式：任何发送到Topic Exchange的消息都会被转发到所有关心RouteKey中指定话题的Queue上。
2. 搭建短信微服务-接收验证码
3. 密码加密
   - `springboot-security` `BCryptPasswordEncoder`
4. 微服务鉴权: 基于JWT的Token认证机制实现
   - JJWT生成token
   - 拦截器拦截请求解析token到request attribute中

8.29

1. 服务发现组件Eureka

   - server指定serverurl以及zone

2. 服务间的调用Feign

   - FeignClient指定server-name

     >note!!!
     >
     >注册到eureka server的client，在互相调用时，看清楚调用的地址(使用了ip地址而不是localhost，遇到问题如timeout等时，记得检查防火墙，是否可以通过ip访问本机api)

3. 熔断器Hystrix

   - 雪崩效应：在微服务架构中通常会有多个服务层调用，基础服务的故障可能会导致级联故障，进而造成整个系统不可用的情况，这种现象被称为服务雪崩效应。服务雪崩效应是一种因“服务提供者”的不可用导致“服务消费者”的不可用,并将不可用逐渐放大的过程。

4. 微服务网关Zuul

   - 网关映射微服务端口
   - 网关过滤器转发Authorization(前台)
   - 网关过滤器校验token(后台)

8.30

1. 集中配置组件SpringCloudConfig

   - 在分布式系统中，由于服务数量巨多，为了方便服务配置文件统一管理，实时更新，所以需要分布式配置中心组件。
   - 将application.yml放到git，并且将位置指定到bootstrap.yml, 通过config server拉取配置

2. 消息总线组件SpringCloudBus

   - 不重启服务器就能更新配置文件

     不支持自定义配置，需要额外添加注解@RefreshScope

   - 使用MQ

     >note!!!  
     >
     >springboot2.0.1 + Finchley.M7有问题，无法初始化RabbitMessageChannelBinderConfiguration
     >
     >更换为了springboot2.1.3+Greenwich.RELEASE/2.0.1+Finchley.M9

   - TODO: 使用bus出错：/actuator/bus-refresh不支持post

8.31

微服务容器部署与持续集成

1. 创建docker私有仓库，信任该仓库，允许docker远程访问
2. 使用Dockerfile部署：打包jar，制作镜像
3. 使用Maven插件自动部署
   - docker打包-制作镜像-上传仓库：`docker:build -DpushImage`

4. 持续集成
   1. 安装Gogs(类似gitlab的git工具) [wxn:wxn wxn@wxn.com]
   2. Jenkins[port:9999 root]
      - 自动拉取代码+maven build+push image

容器管理与容器监控

1. Rancher： 

   - 监控主机，容器，创建容器

   - 扩容缩容[POST]

2. influxDb+cAdvisor+grafana

   - cAdvisor不需要任何配置就可以通过运行在Docker主机上的容器来监控Docker容器，而且可以监控Docker主机。(采集数据)

   - influxDB是一个分布式时间序列数据库。cAdvisor仅仅显示实时信息，但是不存储
     监视数据。因此，我们需要提供时序数据库用于存储cAdvisor组件所提供的监控信息，
     以便显示除实时信息之外的时序数据。(储存数据)
   - Grafana是一个可视化面板（Dashboard），有着非常漂亮的图表和布局展示，功
     能齐全的度量仪表盘和图形编辑器。(展示数据)
   - Grafana关联influxDB数据库，cAdvisor将数据存储到influxDB中。Grafana可以设置预警线，比如根据微服务的内存变化，自动触发Rancher的webhook实现自动扩容缩容。









