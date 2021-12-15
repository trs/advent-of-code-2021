.PHONY: all test

all: test

test:
	@(cd day/$(day) && deno run --allow-read=./ solution.ts)