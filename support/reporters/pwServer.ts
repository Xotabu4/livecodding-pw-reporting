import fs from "fs/promises";

import path from "path";
import { request } from "@playwright/test";
import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
} from "@playwright/test/reporter";

const serverURL = 'https://pw-reports-server-alex-hot.koyeb.app'

class MyReporter implements Reporter {
  config: FullConfig;
  onBegin(config: FullConfig, suite: Suite) {
    this.config = config;
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  async onEnd(result: FullResult) {
    const ctx = await request.newContext();
    const testResults = this.config.reporter.find((r) => r[0] === "blob")[1];
    const testResultPath = path.join(
      process.cwd(),
      'blob-report',
      'report.zip'
    );
    const buffer = await fs.readFile(testResultPath);
    const resp = await ctx.put(`${serverURL}/api/result/upload`, {
      multipart: {
        file: {
          name: 'report.zip',
          mimeType: "application/zip",
          buffer: buffer,
        },
        name: "livecodding-pw-reporting",
      },
    });

    // const { data } = await resp.json();

    // console.log(data);
    // // generating report
    // const report = await (
    //   await ctx.post(`${serverURL}/api/report/generate`, {
    //     data: {
    //       resultsIds: [data.resultID],
    //     },
    //   })
    // ).json();
    
    // console.log(
    //     `🎭 HTML Report is available at: ${serverURL}/${report.reportUrl}`
    // )
  }
}

export default MyReporter;
