# Sử dụng image chính thức của Node.js
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và cài đặt dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Sao chép toàn bộ mã nguồn
COPY . .

# Expose port 5000
EXPOSE 5000

# Khởi chạy server Express
CMD ["yarn", "start"]
