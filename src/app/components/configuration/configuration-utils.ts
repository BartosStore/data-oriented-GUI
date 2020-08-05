import { IConfigurationDto, ConfigTableRecordsDto, IConfigRecord, IConfiguration } from 'src/app/models/configuration.model';
import { BatchType } from 'src/app/enums/batch-type';
import { BatchStatus } from 'src/app/models/batch.model';

export class ConfigurationUtils {
  // compose for send
  public static toDto(configuration: IConfiguration): IConfigurationDto {
    return {
      autoStart: JSON.stringify(this.convertOneArrayIntoKeyArray(configuration.autoStart)),
      manualStart: JSON.stringify(this.convertOneArrayIntoKeyArray(configuration.manualStart)),
      qualityCheck: JSON.stringify(configuration.qualityCheck)
    };
  }

  // fill with BE values
  public static fromData(data: IConfigurationDto): IConfiguration {
    const configuration: IConfiguration = {
      manualStart: this.convertKeyArrayIntoOneArray(JSON.parse(data.manualStart)),
      autoStart: this.convertKeyArrayIntoOneArray(JSON.parse(data.autoStart)),
      qualityCheck: JSON.parse(data.qualityCheck)
    };
    return configuration;
  }

  private static convertKeyArrayIntoOneArray(recordsDto: ConfigTableRecordsDto): IConfigRecord[] {
    const recordsArray: IConfigRecord[] = [];
    for (const [key, jobs] of Object.entries(recordsDto)) {
      const records: IConfigRecord[] = jobs.map((job) => ({ batchType: BatchType[key], jobType: BatchStatus[job] }));
      recordsArray.push(...records);
    }
    return recordsArray;
  }

  private static convertOneArrayIntoKeyArray(records: IConfigRecord[]) {
    const convertedQualityCheck = {};
    Object.keys(BatchType).forEach(batchType => {
      const recordsByBatch = records.filter(m => m.batchType === batchType).map(m => m.jobType);
      convertedQualityCheck[batchType] = recordsByBatch;
    });
    return convertedQualityCheck;
  }
}
