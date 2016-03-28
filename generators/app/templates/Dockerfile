FROM <%= image %>:<%= tag %>

COPY . /src

WORKDIR /src

RUN npm install

ENTRYPOINT ["npm"]

CMD ["start"]
