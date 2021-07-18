import { ComponentFactoryResolver, ComponentRef, Directive, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentsService {
  private componentRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  createComponent(componentInstance: any, containerRef: ViewContainerRef): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentInstance);
    containerRef.clear();

    this.componentRef = containerRef.createComponent(componentFactory);

    return this.componentRef;
  }

  destroyComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
