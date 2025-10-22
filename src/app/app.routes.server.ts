import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    // Disable prerendering for dynamic routes
    path: 'quiz/:id',
    renderMode: RenderMode.Server
  },
  {
    // Keep prerendering for all static routes
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
