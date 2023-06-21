'use client';

import { LinkButton as MyLinkButton } from '@dlarroder/playground';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

export default function LinkButton(
  props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
) {
  return <MyLinkButton {...props} />;
}
