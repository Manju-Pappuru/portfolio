# Build the Spring Boot application with Java 21.
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /workspace

COPY pom.xml ./
RUN mvn -B -DskipTests dependency:go-offline

COPY src ./src
RUN mvn -B -DskipTests package

# Run only the packaged application in the final image.
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

RUN useradd --system --create-home appuser
COPY --from=build /workspace/target/*.jar app.jar

USER appuser
EXPOSE 8081

# Render supplies PORT at runtime; use 8081 for local Docker runs.
ENTRYPOINT ["sh", "-c", "exec java -Dserver.port=${PORT:-8081} -jar /app/app.jar"]
