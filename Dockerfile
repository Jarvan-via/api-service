# 构建基础镜像
FROM node:16-alpine as base

# ENV APP_PATH=/home/node/app 
#     # NODE_ENV=production

# WORKDIR $APP_PATH
# # RUN apk add --no-cache --update nodejs=16.19.0-r0


# # 使用基础镜像 安装依赖
# FROM base as install
# COPY package*.json ./

# RUN npm i

# # 最终阶段
# FROM base

# COPY --from=install $APP_PATH/node_modules ./node_modules
# COPY . .


# RUN npm run build


WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build
