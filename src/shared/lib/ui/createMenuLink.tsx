import { RouteInstance, RouteParams } from 'atomic-router';
import { Link } from 'atomic-router-react';

export const createMenuLink = ({
  label,
  route,
  params,
}: {
  label: string;
  route: RouteInstance<RouteParams>;
  params?: RouteParams;
}) => (
  <Link to={route} params={params}>
    {label}
  </Link>
);
