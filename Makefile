.PHONY: help fresh install generate migrate migrate-deploy studio db-up db-down dev build start start-only lint clean

help: ## Show available commands
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'

fresh: install generate migrate-deploy ## Install, generate Prisma, migrate Supabase, start app
	@echo "Starting CurNext on http://localhost:3003 (network: 0.0.0.0:3003)"
	npm run dev

install: ## Install npm dependencies
	npm install

generate: ## Generate Prisma client
	npx prisma generate

migrate: ## Create/apply migrations in development (prisma migrate dev)
	npx prisma migrate dev

migrate-deploy: ## Apply pending migrations to DATABASE_URL (Supabase)
	@test -n "$$DATABASE_URL" || (grep -q '^DATABASE_URL=.\+' .env 2>/dev/null) || { \
		echo "Missing DATABASE_URL."; \
		echo "In Supabase: Project Settings → Database → Connection string (URI)."; \
		echo "Put it in .env as DATABASE_URL=postgresql://postgres:..."; \
		exit 1; \
	}
	npx prisma migrate deploy

studio: ## Open Prisma Studio
	npx prisma studio

db-up: ## (Optional) Start local Docker Postgres — not required when using Supabase
	docker compose up -d db

db-down: ## Stop optional local Docker Postgres
	docker compose stop db

build: generate ## Build production app
	npm run build

# Day-to-day: hot reload on :3003.
start: ## Start Next.js development server with hot reload on :3003
	@echo "Starting CurNext (dev, hot reload) on http://localhost:3003"
	npm run dev

dev: start ## Alias for start

# Production: rebuild then serve frozen bundle (no hot reload).
prod: build ## Rebuild production bundle, then serve on :3003
	@echo "Serving latest production build on http://localhost:3003"
	npm run start

start-only: ## Serve existing production build without rebuilding
	npm run start

lint: ## Run ESLint
	npm run lint

clean: ## Remove build artifacts and generated client
	rm -rf .next node_modules/.cache
	rm -rf node_modules/.prisma
