using System;
using System.Collections.Generic;
using System.Linq;

namespace WebApi.Database;

public static class Positions
{
    public static IList<(int, int)> Refresh(IEnumerable<(int , int)> positions, int fixedPositionId)
    {
        var orderedPositions = positions.OrderBy(pair => pair.Item2);
        if(!ShouldBeRefreshed(orderedPositions))
        {
            return orderedPositions.ToList();
        }
        var uniquePositions = new List<(int, int)>(orderedPositions);
        uniquePositions.RemoveAt(uniquePositions.IndexOf(uniquePositions.FirstOrDefault(pair => pair.Item1 == fixedPositionId)));

        var missingPosition = MissingPosition(uniquePositions) ?? uniquePositions.Last().Item2 + 1;
        var doublePosition = DoublePosition(orderedPositions);

        var isDoublePositionHigher = missingPosition < doublePosition;
        var itemToSkip = isDoublePositionHigher ? uniquePositions.Count(pair => pair.Item2 < missingPosition) : uniquePositions.Count(pair => pair.Item2 < doublePosition);
        var itemToTake = isDoublePositionHigher ? uniquePositions.Skip(itemToSkip).Count(pair => pair.Item2 <= doublePosition) : uniquePositions.Skip(itemToSkip).Count(pair => pair.Item2 < missingPosition);
        var positionToAdd = isDoublePositionHigher ? -1 : 1;

        var positionsUpdated = Update(uniquePositions.Skip(itemToSkip).Take(itemToTake), positionToAdd);
        return AppendList(orderedPositions, positionsUpdated).OrderBy(pair => pair.Item2).ToList();
    }

    public static IList<(int, int)> RefreshDeleted(IEnumerable<(int, int)> positions)
    {
        var orderedPositions = positions.OrderBy(pair => pair.Item2);
        if(!ShouldBeRefreshed(orderedPositions))
        {
            return orderedPositions.ToList();
        }
        var missingPosition = MissingPosition(orderedPositions) ?? throw new NullReferenceException();
        var itemToSkip = orderedPositions.Count(pair => pair.Item2 < missingPosition);

        var positionsUpdated = Update(orderedPositions.Skip(itemToSkip), -1);
        return AppendList(orderedPositions, positionsUpdated).OrderBy(pair => pair.Item2).ToList();
    }

    private static IList<(int, int)> AppendList(IEnumerable<(int, int)> firstList, IEnumerable<(int, int)> secondList)
    {
        var newList = firstList.Except(secondList, new IdPositionCompararer());
        foreach(var pair in secondList)
        {
            newList = newList.Append(pair);
        }
        return newList.ToList();
    }

    private static IList<(int, int)> Update(IEnumerable<(int, int)> positionsToUpdate, int positionToAdd)
    {
        var positionsUpdated = new List<(int, int)>(positionsToUpdate);
        for(var index = 0; index < positionsUpdated.Count(); index++)
        {
            var pair = positionsUpdated[index];
            pair.Item2 += positionToAdd;
            positionsUpdated[index] = (pair.Item1, pair.Item2);
        }
        return positionsUpdated;
    }

    private static bool ShouldBeRefreshed(IEnumerable<(int, int)> positions)
    {
        return MissingPosition(positions) is not null;
    }

    private static int? MissingPosition(IEnumerable<(int, int)> positions)
    {
        var expectedPosition = 1;
        foreach(var pair in positions.OrderBy(pair => pair.Item2))
        {
            if(pair.Item2 != expectedPosition)
                return expectedPosition;
            expectedPosition++;
        }
        return null;
    }

    private static int? DoublePosition(IEnumerable<(int, int)> positions)
    {
        var previousPosition = 0;
        foreach (var pair in positions.OrderBy(pair => pair.Item2))
        {
            if(pair.Item2 == previousPosition)
                return previousPosition;
            previousPosition = pair.Item2;
        }
        return null;
    }
}

class IdPositionCompararer : IEqualityComparer<(int, int)>
{
    public bool Equals((int, int) first, (int, int) second)
    {
        return first.Item1 == second.Item1;
    }

    public int GetHashCode((int, int) pair)
    {
        return pair.Item1.GetHashCode();
    }
}