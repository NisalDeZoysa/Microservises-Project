#!/bin/bash

# Microservices Kubernetes Cleanup Script
set -e

echo "🧹 Starting Microservices Kubernetes Cleanup..."

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Delete all resources
echo "🗑️ Deleting all resources..."

echo "Deleting Ingress..."
kubectl delete -f ingress.yaml --ignore-not-found=true

echo "Deleting frontend..."
kubectl delete -f frontend.yaml --ignore-not-found=true

echo "Deleting analytics-service..."
kubectl delete -f analytics-service.yaml --ignore-not-found=true

echo "Deleting email-service..."
kubectl delete -f email-service.yaml --ignore-not-found=true

echo "Deleting order-service..."
kubectl delete -f order-service.yaml --ignore-not-found=true

echo "Deleting payment-service..."
kubectl delete -f payment-service.yaml --ignore-not-found=true

echo "Deleting login-service..."
kubectl delete -f login-service.yaml --ignore-not-found=true

echo "Deleting Kafka UI..."
kubectl delete -f kafka-ui.yaml --ignore-not-found=true

echo "Deleting MongoDB..."
kubectl delete -f mongodb.yaml --ignore-not-found=true

echo "Deleting Kafka..."
kubectl delete -f kafka.yaml --ignore-not-found=true

echo "Deleting ConfigMap and Secret..."
kubectl delete -f configmap.yaml --ignore-not-found=true
kubectl delete -f secret.yaml --ignore-not-found=true

echo "Deleting namespace..."
kubectl delete namespace microservices --ignore-not-found=true

echo "✅ Cleanup completed successfully!"

# Remove Docker images (optional)
read -p "Do you want to remove Docker images as well? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🐳 Removing Docker images..."
    docker rmi login-service:latest payment-service:latest order-service:latest email-service:latest analytics-service:latest frontend:latest 2>/dev/null || true
    echo "✅ Docker images removed!"
fi

echo "🎉 Cleanup completed!"
