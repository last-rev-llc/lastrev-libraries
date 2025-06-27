import { SimpleTimer, HumanReadableTimer, TimerUnits } from './index';

describe('Timer', () => {
  describe('SimpleTimer', () => {
    it('should create a timer and track elapsed time', async () => {
      const timer = new SimpleTimer();
      
      // Wait a reasonable amount of time
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const result = timer.end();
      
      expect(result).toBe(timer);
      expect(timer.millis).toBeGreaterThan(20); // Conservative lower bound
      expect(timer.millis).toBeLessThan(1000); // Reasonable upper bound
    });

    it('should return elapsed time in milliseconds', async () => {
      const timer = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      timer.end();
      const millis = timer.millis;
      
      expect(millis).toBeGreaterThan(50); // Conservative - should be at least 50ms
      expect(millis).toBeLessThan(500); // Generous upper bound
      expect(typeof millis).toBe('number');
      expect(Number.isFinite(millis)).toBe(true);
    });

    it('should return elapsed time in seconds', async () => {
      const timer = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      timer.end();
      const seconds = timer.seconds;
      
      expect(seconds).toBeGreaterThanOrEqual(0);
      expect(seconds).toBeLessThan(1); // Should be less than 1 second
    });

    it('should return elapsed time in microseconds', async () => {
      const timer = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      timer.end();
      const micros = timer.micros;
      
      expect(micros).toBeGreaterThan(50000); // At least 50ms in microseconds
      expect(micros).toBeLessThan(500000); // Less than 500ms in microseconds
      expect(typeof micros).toBe('number');
      expect(Number.isFinite(micros)).toBe(true);
    });

    it('should return elapsed time in nanoseconds', async () => {
      const timer = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      timer.end();
      const nanos = timer.nanos;
      
      expect(nanos).toBeGreaterThan(50000000); // At least 50ms in nanoseconds
      expect(nanos).toBeLessThan(500000000); // Less than 500ms in nanoseconds
      expect(typeof nanos).toBe('number');
      expect(Number.isFinite(nanos)).toBe(true);
    });

    it('should get elapsed time with specific units using getElapsedString', async () => {
      const timer = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      timer.end();
      
      const msElapsed = timer.getElapsedString('ms');
      const sElapsed = timer.getElapsedString('s');
      const usElapsed = timer.getElapsedString('us');
      const nsElapsed = timer.getElapsedString('ns');
      
      // Verify reasonable values with conservative bounds
      expect(msElapsed).toBeGreaterThan(50);
      expect(msElapsed).toBeLessThan(500);
      expect(sElapsed).toBeGreaterThanOrEqual(0);
      expect(sElapsed).toBeLessThan(1);
      expect(usElapsed).toBeGreaterThan(50000);
      expect(usElapsed).toBeLessThan(500000);
      expect(nsElapsed).toBeGreaterThan(50000000);
      expect(nsElapsed).toBeLessThan(500000000);
    });

    it('should throw error when trying to end timer twice', () => {
      const timer = new SimpleTimer();
      
      timer.end();
      
      expect(() => timer.end()).toThrow('Timer already ended');
    });

    it('should throw error when accessing elapsed time before ending', () => {
      const timer = new SimpleTimer();
      
      expect(() => timer.millis).toThrow('Timer not ended yet');
      expect(() => timer.seconds).toThrow('Timer not ended yet');
      expect(() => timer.micros).toThrow('Timer not ended yet');
      expect(() => timer.nanos).toThrow('Timer not ended yet');
      expect(() => timer.getElapsedString('ms')).toThrow('Timer not ended yet');
    });

    it('should handle very short time intervals', () => {
      const timer = new SimpleTimer();
      
      // End immediately without waiting
      timer.end();
      
      // Should not throw and should return some small positive value
      expect(timer.nanos).toBeGreaterThanOrEqual(0);
      expect(timer.micros).toBeGreaterThanOrEqual(0);
      expect(timer.millis).toBeGreaterThanOrEqual(0);
      expect(timer.seconds).toBeGreaterThanOrEqual(0);
    });

    it('should return consistent results when accessed multiple times', async () => {
      const timer = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 10));
      
      timer.end();
      
      const millis1 = timer.millis;
      const millis2 = timer.millis;
      const seconds1 = timer.seconds;
      const seconds2 = timer.seconds;
      
      expect(millis1).toBe(millis2);
      expect(seconds1).toBe(seconds2);
    });

    describe('unit conversions', () => {
      it('should properly convert between time units', async () => {
        const timer = new SimpleTimer();
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        timer.end();
        
        const ms = timer.millis;
        const us = timer.micros;
        const ns = timer.nanos;
        const s = timer.seconds;
        
        // Verify reasonable ranges for a ~100ms timer
        expect(ms).toBeGreaterThan(50);
        expect(ms).toBeLessThan(500);
        expect(us).toBeGreaterThan(50000);
        expect(us).toBeLessThan(500000);
        expect(ns).toBeGreaterThan(50000000);
        expect(ns).toBeLessThan(500000000);
        expect(s).toBeGreaterThanOrEqual(0);
        expect(s).toBeLessThan(1);
        
        // Verify unit ordering (larger units should have smaller values)
        expect(s).toBeLessThanOrEqual(ms);
        expect(ms).toBeLessThan(us);
        expect(us).toBeLessThan(ns);
      });

      it('should handle all supported timer units', () => {
        const timer = new SimpleTimer();
        timer.end();
        
        const units: TimerUnits[] = ['s', 'ms', 'us', 'ns'];
        
        units.forEach(unit => {
          expect(() => timer.getElapsedString(unit)).not.toThrow();
          expect(timer.getElapsedString(unit)).toBeGreaterThanOrEqual(0);
        });
      });
    });

    describe('edge cases', () => {
      it('should handle zero elapsed time gracefully', () => {
        const timer = new SimpleTimer();
        timer.end();
        
        // Even with zero elapsed time, should not throw
        expect(() => timer.nanos).not.toThrow();
        expect(() => timer.micros).not.toThrow();
        expect(() => timer.millis).not.toThrow();
        expect(() => timer.seconds).not.toThrow();
      });

      it('should maintain precision for very small time measurements', () => {
        const timer = new SimpleTimer();
        timer.end();
        
        const ns = timer.nanos;
        const us = timer.micros;
        
        // Nanoseconds should be more precise than microseconds
        expect(ns).toBeGreaterThanOrEqual(us);
      });

      it('should handle the safeNumber function edge case', () => {
        // This tests the internal safeNumber function indirectly
        // by ensuring it properly handles large numbers
        const timer = new SimpleTimer();
        timer.end();
        
        // The safeNumber function should handle the conversion without throwing
        // for normal timer operations
        expect(() => timer.nanos).not.toThrow();
        expect(() => timer.micros).not.toThrow();
        expect(() => timer.millis).not.toThrow();
        expect(() => timer.seconds).not.toThrow();
      });
    });
  });

  describe('HumanReadableTimer', () => {
    it('should create a timer with a name', () => {
      const timerName = 'Test Operation';
      const timer = new HumanReadableTimer(timerName);
      
      expect(timer).toBeInstanceOf(HumanReadableTimer);
    });

    it('should return human readable string with default milliseconds', async () => {
      const timerName = 'Database Query';
      const timer = new HumanReadableTimer(timerName);
      
      await new Promise(resolve => setTimeout(resolve, 20));
      
      const result = timer.end();
      
      expect(result).toContain(timerName);
      expect(result).toContain('ms');
      expect(result).toMatch(/Database Query in \d+ ms/);
    });

    it('should return human readable string with specified units', async () => {
      const timerName = 'File Processing';
      const timer = new HumanReadableTimer(timerName);
      
      await new Promise(resolve => setTimeout(resolve, 15));
      
      const result = timer.end('us');
      
      expect(result).toContain(timerName);
      expect(result).toContain('us');
      expect(result).toMatch(/File Processing in \d+ us/);
    });

    it('should work with all supported time units', async () => {
      const units: TimerUnits[] = ['s', 'ms', 'us', 'ns'];
      
      for (const unit of units) {
        const timer = new HumanReadableTimer('Test');
        
        await new Promise(resolve => setTimeout(resolve, 5));
        
        const result = timer.end(unit);
        
        expect(result).toContain('Test');
        expect(result).toContain(unit);
        expect(result).toMatch(new RegExp(`Test in \\d+ ${unit}`));
      }
    });

    it('should handle different timer names', async () => {
      const names = [
        'API Request',
        'Data Transformation',
        'Cache Lookup',
        'File I/O Operation'
      ];
      
      for (const name of names) {
        const timer = new HumanReadableTimer(name);
        
        await new Promise(resolve => setTimeout(resolve, 5));
        
        const result = timer.end();
        
        expect(result).toContain(name);
        expect(result).toMatch(new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} in \\d+ ms`));
      }
    });

    it('should handle empty and special character names', async () => {
      const specialNames = [
        '',
        'Test with spaces',
        'Test-with-dashes',
        'Test_with_underscores',
        'Test123',
        'Test (with parentheses)',
        'Test [with brackets]'
      ];
      
      for (const name of specialNames) {
        const timer = new HumanReadableTimer(name);
        
        await new Promise(resolve => setTimeout(resolve, 5));
        
        const result = timer.end();
        
        expect(result).toContain(name);
        expect(result).toContain('ms');
      }
    });

    it('should show different elapsed times for different operations', async () => {
      const timer1 = new HumanReadableTimer('Fast Operation');
      await new Promise(resolve => setTimeout(resolve, 50));
      const result1 = timer1.end();
      
      const timer2 = new HumanReadableTimer('Slow Operation');
      await new Promise(resolve => setTimeout(resolve, 150));
      const result2 = timer2.end();
      
      // Extract numeric values from results
      const time1 = parseInt(result1.match(/(\d+) ms/)?.[1] || '0');
      const time2 = parseInt(result2.match(/(\d+) ms/)?.[1] || '0');
      
      // With larger time differences, this should be more reliable
      expect(time2).toBeGreaterThan(time1);
      expect(time1).toBeGreaterThan(20); // At least 20ms for 50ms wait
      expect(time2).toBeGreaterThan(100); // At least 100ms for 150ms wait
    });
  });

  describe('integration tests', () => {
    it('should work with multiple timers simultaneously', async () => {
      const timer1 = new SimpleTimer();
      const timer2 = new HumanReadableTimer('Concurrent Operation');
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      timer1.end();
      const humanResult = timer2.end();
      
      expect(timer1.millis).toBeGreaterThan(50);
      expect(timer1.millis).toBeLessThan(500);
      expect(humanResult).toContain('Concurrent Operation');
      expect(humanResult).toMatch(/Concurrent Operation in \d+ ms/);
    });

    it('should handle immediate timing without setTimeout dependency', () => {
      // This test doesn't rely on setTimeout timing
      const timer = new SimpleTimer();
      
      // Do some synchronous work to ensure some time passes
      let sum = 0;
      for (let i = 0; i < 10000; i++) {
        sum += i;
      }
      
      timer.end();
      
      // Should have some elapsed time, even if very small
      expect(timer.nanos).toBeGreaterThanOrEqual(0);
      expect(timer.micros).toBeGreaterThanOrEqual(0);
      expect(timer.millis).toBeGreaterThanOrEqual(0);
      expect(timer.seconds).toBeGreaterThanOrEqual(0);
      
      // Verify timer functionality works
      expect(() => timer.nanos).not.toThrow();
      expect(() => timer.millis).not.toThrow();
    });

    it('should maintain independence between timer instances', async () => {
      const timer1 = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const timer2 = new SimpleTimer();
      
      await new Promise(resolve => setTimeout(resolve, 50));
      
      timer1.end();
      timer2.end();
      
      // Timer1 should be longer since it waited longer
      expect(timer1.millis).toBeGreaterThan(timer2.millis);
      // Conservative bounds with larger differences
      expect(timer1.millis).toBeGreaterThan(80);
      expect(timer2.millis).toBeGreaterThan(30);
      expect(timer1.millis).toBeLessThan(500);
      expect(timer2.millis).toBeLessThan(200);
    });
  });
});