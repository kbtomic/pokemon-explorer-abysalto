#!/bin/bash

echo "=== PokeAPI Endpoint Count Verification ==="
echo "Date: $(date)"
echo ""

echo "Endpoint | Expected | Actual | Status"
echo "---------|----------|--------|--------"

# Check each endpoint individually
check_endpoint() {
    local endpoint=$1
    local expected=$2
    local actual=$(curl -s "https://pokeapi.co/api/v2/$endpoint?limit=1" 2>/dev/null | jq -r '.count // "ERROR"' 2>/dev/null)
    
    if [ "$actual" = "ERROR" ] || [ -z "$actual" ]; then
        status="❌ ERROR"
    elif [ "$actual" = "$expected" ]; then
        status="✅ MATCH"
    else
        status="⚠️  MISMATCH"
    fi
    
    printf "%-20s | %-8s | %-6s | %s\n" "$endpoint" "$expected" "$actual" "$status"
}

# Check all endpoints
check_endpoint "pokemon" "1302"
check_endpoint "pokemon-species" "1025"
check_endpoint "pokemon-form" "1527"
check_endpoint "pokemon-color" "10"
check_endpoint "pokemon-shape" "14"
check_endpoint "pokemon-habitat" "9"
check_endpoint "move" "937"
check_endpoint "move-ailment" "22"
check_endpoint "move-battle-style" "3"
check_endpoint "move-category" "14"
check_endpoint "move-damage-class" "3"
check_endpoint "move-learn-method" "11"
check_endpoint "move-target" "16"
check_endpoint "item" "2180"
check_endpoint "item-category" "54"
check_endpoint "item-attribute" "8"
check_endpoint "item-pocket" "8"
check_endpoint "item-fling-effect" "7"
check_endpoint "evolution-chain" "541"
check_endpoint "evolution-trigger" "13"
check_endpoint "egg-group" "15"
check_endpoint "gender" "3"
check_endpoint "location" "1070"
check_endpoint "location-area" "1089"
check_endpoint "region" "10"
check_endpoint "pal-park-area" "5"
check_endpoint "pokedex" "32"
check_endpoint "encounter-method" "37"
check_endpoint "encounter-condition" "14"
check_endpoint "encounter-condition-value" "105"
check_endpoint "nature" "25"
check_endpoint "stat" "8"
check_endpoint "growth-rate" "6"
check_endpoint "characteristic" "30"
check_endpoint "berry" "64"
check_endpoint "berry-firmness" "5"
check_endpoint "berry-flavor" "5"
check_endpoint "contest-type" "5"
check_endpoint "contest-effect" "33"
check_endpoint "super-contest-effect" "22"
check_endpoint "machine" "2102"
check_endpoint "version" "46"
check_endpoint "version-group" "29"
check_endpoint "language" "13"
check_endpoint "pokeathlon-stat" "5"
check_endpoint "ability" "367"
check_endpoint "type" "21"
check_endpoint "generation" "9"

echo ""
echo "=== Verification Complete ==="
