#!/bin/bash

# Microservices Kubernetes Deployment Script
set -e

echo "🚀 Starting Microservices Kubernetes Deployment..."

# Check if kubectl is installed
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl is not installed. Please install kubectl first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Build all Docker images
echo "🔨 Building Docker images..."

echo "Building login-service..."
docker build -t login-service:latest ./services/login-service

echo "Building payment-service..."
docker build -t payment-service:latest ./services/payment-service

echo "Building order-service..."
docker build -t order-service:latest ./services/order-service

echo "Building email-service..."
docker build -t email-service:latest ./services/email-service

echo "Building analytics-service..."
docker build -t analytics-service:latest ./services/analytic-service

echo "Building frontend..."
docker build -t frontend:latest ./services/client2

echo "✅ All Docker images built successfully!"

# Create namespace
echo "📦 Creating namespace..."
kubectl apply -f namespace.yaml

# Apply ConfigMap and Secret
echo "🔐 Applying ConfigMap and Secret..."
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml

# Wait for namespace to be ready
echo "⏳ Waiting for namespace to be ready..."
kubectl wait --for=condition=Ready namespace/microservices --timeout=60s

# Deploy infrastructure services
echo "🏗️ Deploying infrastructure services..."

echo "Deploying Kafka..."
kubectl apply -f kafka.yaml
kubectl wait --for=condition=available --timeout=300s deployment/kafka -n microservices

echo "Deploying MongoDB..."
kubectl apply -f mongodb.yaml
kubectl wait --for=condition=available --timeout=300s deployment/mongodb -n microservices

echo "Deploying Kafka UI..."
kubectl apply -f kafka-ui.yaml
kubectl wait --for=condition=available --timeout=300s deployment/kafka-ui -n microservices

# Deploy microservices
echo "🔧 Deploying microservices..."

echo "Deploying login-service..."
kubectl apply -f login-service.yaml
kubectl wait --for=condition=available --timeout=300s deployment/login-service -n microservices

echo "Deploying payment-service..."
kubectl apply -f payment-service.yaml
kubectl wait --for=condition=available --timeout=300s deployment/payment-service -n microservices

echo "Deploying order-service..."
kubectl apply -f order-service.yaml
kubectl wait --for=condition=available --timeout=300s deployment/order-service -n microservices

echo "Deploying email-service..."
kubectl apply -f email-service.yaml
kubectl wait --for=condition=available --timeout=300s deployment/email-service -n microservices

echo "Deploying analytics-service..."
kubectl apply -f analytics-service.yaml
kubectl wait --for=condition=available --timeout=300s deployment/analytics-service -n microservices

# Deploy frontend
echo "🌐 Deploying frontend..."
kubectl apply -f frontend.yaml
kubectl wait --for=condition=available --timeout=300s deployment/frontend -n microservices

# Apply Ingress
echo "🚪 Applying Ingress..."
kubectl apply -f ingress.yaml

# Show deployment status
echo "📊 Deployment Status:"
kubectl get pods -n microservices
kubectl get services -n microservices
kubectl get ingress -n microservices

echo ""
echo "🎉 Microservices deployment completed successfully!"
echo ""
echo "📋 Access Information:"
echo "Frontend: http://localhost:3000 (via port-forward)"
echo "Kafka UI: http://localhost:9090 (via port-forward)"
echo "Login Service: http://localhost:7001 (via port-forward)"
echo "Payment Service: http://localhost:8001 (via port-forward)"
echo "Analytics Service: http://localhost:8000 (via port-forward)"
echo ""
echo "🔗 To access services from outside the cluster, use port-forward:"
echo "kubectl port-forward -n microservices service/frontend-service 3000:3000"
echo "kubectl port-forward -n microservices service/kafka-ui-service 9090:8080"
echo "kubectl port-forward -n microservices service/login-service 7001:7001"
echo "kubectl port-forward -n microservices service/payment-service 8001:8001"
echo "kubectl port-forward -n microservices service/analytics-service 8000:8000"
