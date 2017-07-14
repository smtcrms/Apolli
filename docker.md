# Apollo for Docker

### 修改明细

1、在apollo-configservice、apollo-adminservice、apollo-portal模块中分别添加了`src/main/docker/Dockerfile`以及在`pom.xml`中添加了`docker-maven-plugin`插件

2、docker环境上的sql脚本`scripts/sql-docker`

修改apolloconfigdb.sql数据库脚本中的`eureka.service.url`为`http://apollo-configservice:8080/eureka/`

3、添加了`Docker`环境示例代码`apollo-spring-boot-sample`

4、添加`docker-compose.yml`文件

5、添加`run.sh`脚本

### 如何使用

克隆项目，在项目根目录下执行`./run.sh`，该过程涉及编译、打包、构建镜像会比较漫长

数据库已经映射到宿主机的`3306`端口，用户名密码为`root/root`

Apollo配置中心 http://localhost:9090 

Eureka注册中心 http://localhost:8080

apollo-spring-boot-sample 示例应用演示与配置

在Apollo配置中心中创建应用`apollo-spring-boot-sample`，其应用id与`/apollo-spring-boot-sample/src/main/resources/META-INF/app.properties`中的内容一致。配置中心中具体的键值对请参考源码。

http://localhost:9190/clientapi 

使用Config API方式实时同步属性值

http://localhost:9190/javaconfig 

使用Config API方式实时同步属性值，注入@ApolloConfig和@ApolloConfigChangeListener

http://localhost:9190/configuration 

使用Spring Boot ConfigurationProperties方式，没有使用Config API，但使用了Spring Cloud的@RefreshScope注解，执行/refresh端点时会刷新属性的值。Apollo配置中心的值修改后，需要执行`curl -X POST http://localhost:9190/refresh`，才能使其生效。
