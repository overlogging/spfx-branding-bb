import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderName, PlaceholderContent
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GlobalNavApplicationCustomizerStrings';

import styles  from './mystyles.module.scss';


const LOG_SOURCE: string = 'GlobalNavApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGlobalNavApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GlobalNavApplicationCustomizer
  extends BaseApplicationCustomizer<IGlobalNavApplicationCustomizerProperties> {
    private headerplaceholder: PlaceholderContent;
  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    console.log('Available Placeholders: ', this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));
    if(!this.headerplaceholder){
        this.headerplaceholder = this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          {//dispose
          });
          this.headerplaceholder.domElement.innerHTML = `
          <div class = "${styles.myheader}">
          <img src="/sites/bbcomms/siteassets/bb2.png" alt="logo"/>
          </div>
          `;
    }

    return Promise.resolve();
  }
}
