import { Component, OnInit } from '@angular/core';

import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { ConfigurationUtils } from 'src/app/components/configuration/configuration-utils';
import { IConfiguration } from 'src/app/models/configuration.model';

@Component({
  selector: 'app-configuration-handler',
  templateUrl: './configuration-handler.component.html',
})
export class ConfigurationHandlerComponent implements OnInit {
  configuration: IConfiguration;
  initLoading = false;
  updateLoading = false;

  constructor(private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    this.fetchConfigurationData();
  }

  onConfigurationChange = (configuration: IConfiguration) => {
    this.updateConfigurationData(configuration);
  }

  private fetchConfigurationData() {
    this.initLoading = true;

    setTimeout(() => {
      const container: IConfiguration = {
        autoStart: [],
        manualStart: [],
        qualityCheck: {
          akceptacniKriteria: { CK: 20, N: 20, S: 20, V: 20, VV: 20 },
          celyVzorek: true,
          testovaciKriterium: 20.74,
          vzorekStranABVV: 150,
          vzorekStranOstatni: 300
        },
      };
      this.configuration = container;
      this.initLoading = false;
    }, 2000);

    /*
    this.configurationService.fetchConfigurationData().subscribe(configData => {
      const configuration: IConfiguration = ConfigurationUtils.fromData(configData);
      this.configuration = configuration;
    }).add(() => this.initLoading = false);
    */
  }

  private updateConfigurationData(configurationDO: IConfiguration) {
    this.updateLoading = true;
    this.configurationService
      .updateConfigurationData(ConfigurationUtils.toDto(configurationDO))
      .subscribe(configData => this.configuration = ConfigurationUtils.fromData(configData)
      ).add(() => this.updateLoading = false);
  }
}
