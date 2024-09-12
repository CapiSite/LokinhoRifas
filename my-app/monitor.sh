#!/bin/bash

# URL de verificação da aplicação
APP_URL="https://lokinhoskins.com.br"  # Substitua pela URL da sua aplicação

# Verifica se a aplicação está respondendo
if curl -s --head $APP_URL | grep "200 OK" > /dev/null; then
    echo "A aplicação está funcionando."
else
    echo "A aplicação não está funcionando. Reiniciando..."
    docker-compose down
    docker-compose up -d
fi