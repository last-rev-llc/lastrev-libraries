ROOT_DIR=$1;
DEFAULT_EXAMPLE="lastrev-next-starter"
EXAMPLE_DIR="examples/${2:-$DEFAULT_EXAMPLE}"

if [ -z "$ROOT_DIR" ]; then
    echo "Usage: $0 <root_dir> [example]"
    exit 1
fi

[ ! -d "$ROOT_DIR" ] && echo "$ROOT_DIR is not an existing directory" && exit 1
[ ! -d "$EXAMPLE_DIR" ] && echo "$EXAMPLE_DIR is not a valid example directory" && exit 1

echo "copying $ROOT_DIR to $EXAMPLE_DIR"

rsync -rv --exclude=.git --exclude=node_modules --exclude=packages/*/node_modules --exclude=.env --exclude=packages/*/.env --exclude=yarn.lock --exclude=packages/*/dist --exclude=packages/web/out --exclude=packages/web/.next --exclude=packages/graphql-runner/cms-sync --exclude=packages/*/CHANGELOG.md  $ROOT_DIR/* $EXAMPLE_DIR