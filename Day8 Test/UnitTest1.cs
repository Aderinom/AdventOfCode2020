using Microsoft.VisualStudio.TestTools.UnitTesting;
using Day8;
namespace Day8_Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        [Owner("Aaron")]
        [TestCategory("Results")]
        [Priority(10)]
        public void TestDeadlockDetection()
        {
            bool threwExp = false;
            var re = new RuntimeEnvoirement();
            string[] testinput = {"nop +0", "acc +1", "jmp +4", "acc +3", "jmp -3", "acc -99", "acc +1", "jmp -4", "acc +6" };
            try
            {
                re.Execute(testinput);
            }
            catch (Day8.DeadlockException)
            {
                threwExp = true;
            }

            Assert.IsTrue(threwExp,"Did not find Deadlock!");
            Assert.IsTrue(re.Accumulator == 5, "Accumulator value is not what expected!");
            Assert.IsTrue(re.CurrentLine == 1, "Line is not what expected wrong!");
        }
        [TestMethod]
        public void TestDebugDetection()
        {
            bool threwExp = false;
            var re = new RuntimeEnvoirement();
            string[] testinput = { "nop +0", "acc +1", "jmp +4", "acc +3", "jmp -3", "acc -99", "acc +1", "jmp -4", "acc +6" };
            try
            {
                re.Execute(testinput);
            }
            catch (Day8.DeadlockException)
            {
                threwExp = true;
            }

            Assert.IsTrue(threwExp, "Did not find Deadlock!");
            int lineChanged = 0;
            int accValue = 0;

            if(!re.Debug(testinput, out lineChanged, out accValue))
            {
                Assert.Fail("Debug did not find solution");
            }
           

            Assert.IsTrue(lineChanged == 7, "Line is not what expected!");
            Assert.IsTrue(accValue == 8, "Accumulator value is not what expected!");
        }
    }
}
