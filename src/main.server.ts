import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { appConfig } from './app/app.config';

export default function bootstrap(context: any) {
  return bootstrapApplication(AppComponent, appConfig, context);
}
