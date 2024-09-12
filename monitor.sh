#!/bin/bash

# URL de verificação da aplicação
APP_URL="http://localhost:3000"  # Substitua pela URL da sua aplicação

# Verifica se a aplicação está respondendo
if curl -s --head $APP_URL | grep "200 OK" > /dev/null; then
    echo "A aplicação está funcionando."
else
    echo "A aplicação não está funcionando. Reiniciando..."
    cd /root/LokinhoRifas
    docker-compose down
    docker-compose up
fi
