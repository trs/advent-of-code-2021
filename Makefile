.PHONY: all test

all: test

test:
	@(cd day/$(day) && deno run --import-map=../../import_map.json --allow-read=./ solution.ts)