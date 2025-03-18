FROM amazoncorretto:17-alpine3.19-jdk

WORKDIR /usr/src/app

COPY target/*.jar app.jar

ENV PORT 50000

EXPOSE $PORT

ENTRYPOINT ["java", "-jar", "app.jar"]
