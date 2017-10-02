# Dockerfile for apollo-portal
# Build with:
# docker build -t apollo-portal .
# Run with:
# docker run -p 8080:8080 -d -v /tmp/logs:/opt/logs --name apollo-portal apollo-portal
# Or if 8080 was taken:
# docker run -p 8070:8080 -d -v /tmp/logs:/opt/logs --name apollo-portal apollo-portal

FROM openjdk:8-jre-slim
MAINTAINER ameizi <sxyx2008@163.com>

ENV VERSION 0.9.0-SNAPSHOT

RUN apt-get update && apt-get install -y --no-install-recommends \
		procps \
		curl \
	&& rm -rf /var/lib/apt/lists/* \
    && ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" > /etc/timezone

ADD apollo-portal-${VERSION}-github.zip /apollo-portal/apollo-portal-${VERSION}-github.zip

RUN unzip /apollo-portal/apollo-portal-${VERSION}-github.zip -d /apollo-portal \
    && rm -rf /apollo-portal/apollo-portal-${VERSION}-github.zip \
    && sed -i '$d' /apollo-portal/scripts/startup.sh \
    && echo "tail -f /dev/null" >> /apollo-portal/scripts/startup.sh

EXPOSE 8080

CMD ["/apollo-portal/scripts/startup.sh"]
