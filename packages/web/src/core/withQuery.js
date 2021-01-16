import useSWR from 'swr';
import withProps from 'recompose/withProps';
import isFunction from 'lodash/isFunction';

export default function withQuery(key, fetcher) {
  return function (WrappedComponent) {
    const WithQuery = withProps((props) => {
      const cacheKey = isFunction(key) ? key(props) : key;
      const query = useSWR(cacheKey, fetcher, {shouldRetryOnError: false}); // TODO: remove shouldRetryOnError to launch
      return query;
    })(WrappedComponent);
    WithQuery.displayName = `WithQuery(${getDisplayName(WrappedComponent)})`;
    return WithQuery;
  };
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
