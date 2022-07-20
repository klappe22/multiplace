start = 1657238400
moments = []
for n in range(60 * 60 * 24 * 3):
    moments.append(start + n)

for moment in moments:
    then = moment
    # print((then + start) % start // 3600 % 24)
    # print(then // 3600 % 24)
    if not ((then // 3600 % 24) == (then + start) % start // 3600 % 24):
        print("yo")

# if start is 00:00 UTC an arbitrary day, then this will always give me a value <- [0, 23] depending on what hour of the day (UTC) we are at, right?
# block.timestamp / 3600 % 24
# (block.timestamp + start) % start // 3600 % 24

# just double checking, this will always give me a value <- [0, 23] depending on what hour of the day (UTC because of where unix timestamps starts from) we are at, right? 0 for the first hour, 1 for the second etc, :
# block.timestamp / 3600 % 24
