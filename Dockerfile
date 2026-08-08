FROM node:22

WORKDIR C:\Users\All-B\Desktop\project\Swapper\src

COPY . .

RUN npm install

EXPOSE 5173

CMD ["node", "./src/App.tsx"]